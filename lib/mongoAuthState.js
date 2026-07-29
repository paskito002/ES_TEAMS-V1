const mongoose = require('mongoose');
const { initAuthCreds, BufferJSON, proto } = require('@whiskeysockets/baileys');

const authStateSchema = new mongoose.Schema({
	sessionId: { type: String, required: true },
	key: { type: String, required: true },
	value: { type: String, required: true },
});
authStateSchema.index({ sessionId: 1, key: 1 }, { unique: true });

const getModel = () => mongoose.models.AuthState || mongoose.model('AuthState', authStateSchema, 'authstates');

async function useMongoAuthState(mongoUri, sessionId) {
	if (mongoose.connection.readyState === 0) {
		await mongoose.connect(mongoUri);
	}
	const Model = getModel();

	const readData = async (key) => {
		const doc = await Model.findOne({ sessionId, key }).lean();
		return doc ? JSON.parse(doc.value, BufferJSON.reviver) : null;
	};

	const writeData = async (key, data) => {
		const value = JSON.stringify(data, BufferJSON.replacer);
		await Model.updateOne({ sessionId, key }, { $set: { value } }, { upsert: true });
	};

	const removeData = async (key) => {
		await Model.deleteOne({ sessionId, key }).catch(() => {});
	};

	const creds = (await readData('creds')) || initAuthCreds();

	return {
		state: {
			creds,
			keys: {
				get: async (type, ids) => {
					const data = {};
					await Promise.all(
						ids.map(async (id) => {
							let value = await readData(`${type}-${id}`);
							if (type === 'app-state-sync-key' && value) {
								value = proto.Message.AppStateSyncKeyData.fromObject(value);
							}
							data[id] = value;
						})
					);
					return data;
				},
				set: async (data) => {
					const tasks = [];
					for (const category in data) {
						for (const id in data[category]) {
							const value = data[category][id];
							const key = `${category}-${id}`;
							tasks.push(value ? writeData(key, value) : removeData(key));
						}
					}
					await Promise.all(tasks);
				},
			},
		},
		saveCreds: async () => writeData('creds', creds),
	};
}

async function clearMongoAuthState(mongoUri, sessionId) {
	if (mongoose.connection.readyState === 0) {
		await mongoose.connect(mongoUri);
	}
	await getModel().deleteMany({ sessionId });
}

module.exports = { useMongoAuthState, clearMongoAuthState };
