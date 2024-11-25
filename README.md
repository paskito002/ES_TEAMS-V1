<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to ES TEAMS V1</title>
    <style>
        /* Global Styles */
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(to right, #ff7e5f, #feb47b);
            color: #fff;
            text-align: center;
        }

        h1 {
            font-size: 3rem;
            margin-top: 100px;
            text-transform: uppercase;
            letter-spacing: 3px;
            animation: fadeIn 2s ease-in-out;
        }

        h2 {
            font-size: 1.5rem;
            margin-top: 30px;
            opacity: 0;
            animation: fadeIn 2s 1s forwards;
        }

        .animated-line {
            width: 50%;
            margin: 50px auto;
            border-top: 3px solid #fff;
            position: relative;
            animation: lineAnimation 3s infinite;
        }

        .animated-line::before {
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            width: 5px;
            height: 5px;
            background: #fff;
            border-radius: 50%;
            transform: translateX(-50%);
            animation: dotAnimation 1s infinite;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        @keyframes lineAnimation {
            0% {
                width: 0;
            }
            50% {
                width: 50%;
            }
            100% {
                width: 0;
            }
        }

        @keyframes dotAnimation {
            0% {
                transform: translateX(-50%) scale(1);
            }
            50% {
                transform: translateX(-50%) scale(1.5);
            }
            100% {
                transform: translateX(-50%) scale(1);
            }
        }

        footer {
            margin-top: 50px;
            font-size: 1rem;
        }

        .footer-text {
            font-size: 1.2rem;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>Welcome to ES TEAMS V1</h1>
    <div class="animated-line"></div>
    <h2>We are sorry to announce that this project is under intensive maintenance. Kindly check back in the next 3 weeks.</h2>
    <footer>
        <div class="footer-text">Thank you!</div>
    </footer>
</body>
</html>
