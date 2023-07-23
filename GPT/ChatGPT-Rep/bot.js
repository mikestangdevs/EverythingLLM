const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");

let userMessage;
const API_KEY = "OPENAI_API_KEY";

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span><svg width="35" height="35" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_602_7)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M924 354.627C924 344.845 924.004 335.062 923.944 325.279C923.895 317.038 923.8 308.799 923.576 300.562C923.092 282.609 922.033 264.502 918.84 246.749C915.602 228.741 910.314 211.98 901.981 195.617C893.789 179.534 883.088 164.817 870.32 152.058C857.555 139.299 842.834 128.605 826.746 120.418C810.366 112.083 793.587 106.797 775.558 103.56C757.803 100.372 739.691 99.315 721.738 98.83C713.495 98.607 705.253 98.513 697.008 98.462C687.22 98.402 677.432 98.407 667.644 98.407L553.997 98H468.997L357.361 98.407C347.554 98.407 337.747 98.402 327.94 98.462C319.678 98.513 311.42 98.607 303.161 98.83C285.167 99.315 267.014 100.373 249.217 103.565C231.164 106.801 214.36 112.085 197.958 120.414C181.835 128.602 167.083 139.297 154.291 152.058C141.501 164.816 130.78 179.53 122.573 195.61C114.217 211.981 108.919 228.752 105.673 246.77C102.477 264.516 101.418 282.617 100.931 300.562C100.709 308.8 100.613 317.039 100.563 325.279C100.503 335.063 100 347.216 100 356.999L100.003 467.089L100 552.998L100.508 665.427C100.508 675.223 100.504 685.019 100.563 694.815C100.613 703.067 100.709 711.317 100.932 719.566C101.418 737.542 102.479 755.675 105.678 773.452C108.923 791.484 114.22 808.269 122.569 824.653C130.777 840.759 141.5 855.495 154.291 868.272C167.082 881.049 181.83 891.757 197.95 899.956C214.362 908.302 231.174 913.595 249.238 916.836C267.027 920.029 285.174 921.088 303.161 921.573C311.42 921.796 319.679 921.891 327.941 921.941C337.748 922.001 347.554 921.997 357.361 921.997L470.006 922H555.217L667.644 921.996C677.432 921.996 687.22 922.001 697.008 921.941C705.253 921.891 713.495 921.796 721.738 921.573C739.698 921.087 757.816 920.027 775.579 916.832C793.597 913.591 810.368 908.3 826.739 899.959C842.831 891.761 857.554 881.051 870.32 868.272C883.086 855.497 893.786 840.763 901.978 824.66C910.316 808.268 915.604 791.475 918.844 773.431C922.034 755.661 923.092 737.535 923.577 719.566C923.8 711.316 923.895 703.066 923.944 694.815C924.005 685.019 924 675.223 924 665.427C924 665.427 923.994 554.983 923.994 552.998V466.999C923.994 465.533 924 354.627 924 354.627Z" fill="url(#paint0_linear_602_7)"/>
    </g>
    <mask id="mask0_602_7" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="100" y="98" width="824" height="824">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M924 354.627C924 344.845 924.004 335.062 923.944 325.279C923.895 317.038 923.8 308.799 923.576 300.562C923.092 282.609 922.033 264.502 918.84 246.749C915.602 228.741 910.314 211.98 901.981 195.617C893.789 179.534 883.088 164.817 870.32 152.058C857.555 139.299 842.834 128.605 826.746 120.418C810.366 112.083 793.587 106.797 775.558 103.56C757.803 100.372 739.691 99.315 721.738 98.83C713.495 98.607 705.253 98.513 697.008 98.462C687.22 98.402 677.432 98.407 667.644 98.407L553.997 98H468.997L357.361 98.407C347.554 98.407 337.747 98.402 327.94 98.462C319.678 98.513 311.42 98.607 303.161 98.83C285.167 99.315 267.014 100.373 249.217 103.565C231.164 106.801 214.36 112.085 197.958 120.414C181.835 128.602 167.083 139.297 154.291 152.058C141.501 164.816 130.78 179.53 122.573 195.61C114.217 211.981 108.919 228.752 105.673 246.77C102.477 264.516 101.418 282.617 100.931 300.562C100.709 308.8 100.613 317.039 100.563 325.279C100.503 335.063 100 347.216 100 356.999L100.003 467.089L100 552.998L100.508 665.427C100.508 675.223 100.504 685.019 100.563 694.815C100.613 703.067 100.709 711.317 100.932 719.566C101.418 737.542 102.479 755.675 105.678 773.452C108.923 791.484 114.22 808.269 122.569 824.653C130.777 840.759 141.5 855.495 154.291 868.272C167.082 881.049 181.83 891.757 197.95 899.956C214.362 908.302 231.174 913.595 249.238 916.836C267.027 920.029 285.174 921.088 303.161 921.573C311.42 921.796 319.679 921.891 327.941 921.941C337.748 922.001 347.554 921.997 357.361 921.997L470.006 922H555.217L667.644 921.996C677.432 921.996 687.22 922.001 697.008 921.941C705.253 921.891 713.495 921.796 721.738 921.573C739.698 921.087 757.816 920.027 775.579 916.832C793.597 913.591 810.368 908.3 826.739 899.959C842.831 891.761 857.554 881.051 870.32 868.272C883.086 855.497 893.786 840.763 901.978 824.66C910.316 808.268 915.604 791.475 918.844 773.431C922.034 755.661 923.092 737.535 923.577 719.566C923.8 711.316 923.895 703.066 923.944 694.815C924.005 685.019 924 675.223 924 665.427C924 665.427 923.994 554.983 923.994 552.998V466.999C923.994 465.533 924 354.627 924 354.627Z" fill="white"/>
    </mask>
    <g mask="url(#mask0_602_7)">
    <rect x="42" y="36" width="914" height="914" fill="url(#paint1_linear_602_7)"/>
    <g filter="url(#filter1_b_602_7)">
    <rect x="100" y="98" width="824" height="824" rx="126" fill="black" fill-opacity="0.01"/>
    </g>
    <g filter="url(#filter2_ii_602_7)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M924 354.627C924 344.845 924.004 335.062 923.944 325.279C923.895 317.038 923.8 308.799 923.576 300.562C923.092 282.609 922.033 264.502 918.84 246.749C915.602 228.741 910.314 211.98 901.981 195.617C893.789 179.534 883.088 164.817 870.32 152.058C857.555 139.299 842.834 128.605 826.746 120.418C810.366 112.083 793.587 106.797 775.558 103.56C757.803 100.372 739.691 99.315 721.738 98.83C713.495 98.607 705.253 98.513 697.008 98.462C687.22 98.402 677.432 98.407 667.644 98.407L553.997 98H468.997L357.361 98.407C347.554 98.407 337.747 98.402 327.94 98.462C319.678 98.513 311.42 98.607 303.161 98.83C285.167 99.315 267.014 100.373 249.217 103.565C231.164 106.801 214.36 112.085 197.958 120.414C181.835 128.602 167.083 139.297 154.291 152.058C141.501 164.816 130.78 179.53 122.573 195.61C114.217 211.981 108.919 228.752 105.673 246.77C102.477 264.516 101.418 282.617 100.931 300.562C100.709 308.8 100.613 317.039 100.563 325.279C100.503 335.063 100 347.216 100 356.999L100.003 467.089L100 552.998L100.508 665.427C100.508 675.223 100.504 685.019 100.563 694.815C100.613 703.067 100.709 711.317 100.932 719.566C101.418 737.542 102.479 755.675 105.678 773.452C108.923 791.484 114.22 808.269 122.569 824.653C130.777 840.759 141.5 855.495 154.291 868.272C167.082 881.049 181.83 891.757 197.95 899.956C214.362 908.302 231.174 913.595 249.238 916.836C267.027 920.029 285.174 921.088 303.161 921.573C311.42 921.796 319.679 921.891 327.941 921.941C337.748 922.001 347.554 921.997 357.361 921.997L470.006 922H555.217L667.644 921.996C677.432 921.996 687.22 922.001 697.008 921.941C705.253 921.891 713.495 921.796 721.738 921.573C739.698 921.087 757.816 920.027 775.579 916.832C793.597 913.591 810.368 908.3 826.739 899.959C842.831 891.761 857.554 881.051 870.32 868.272C883.086 855.497 893.786 840.763 901.978 824.66C910.316 808.268 915.604 791.475 918.844 773.431C922.034 755.661 923.092 737.535 923.577 719.566C923.8 711.316 923.895 703.066 923.944 694.815C924.005 685.019 924 675.223 924 665.427C924 665.427 923.994 554.983 923.994 552.998V466.999C923.994 465.533 924 354.627 924 354.627Z" fill="url(#paint2_linear_602_7)" fill-opacity="0.01"/>
    </g>
    <g filter="url(#filter3_dddii_602_7)">
    <path d="M481.676 220.518C418.269 220.518 361.938 261.285 342.307 321.49C301.541 329.88 266.346 355.372 245.722 391.495C213.923 446.384 221.192 515.396 263.784 562.44C250.622 601.862 255.138 644.966 276.145 680.673C307.753 735.755 371.353 764 433.576 750.87C461.149 781.933 500.763 799.643 542.33 799.483C605.738 799.483 662.068 758.716 681.731 698.51C722.562 690.088 757.693 664.597 778.124 628.538C810.116 573.648 802.847 504.636 760.254 457.561V457.369C773.416 417.947 768.901 374.81 747.893 338.943C716.285 284.054 652.685 255.809 590.655 268.938C562.922 237.939 523.244 220.326 481.676 220.518ZM481.676 258.146L481.484 258.338C507.008 258.338 531.538 267.145 551.169 283.445C550.368 283.83 548.799 284.822 547.646 285.399L432.199 351.881C426.307 355.212 422.784 361.488 422.784 368.341V524.395L373.115 495.766V366.772C373.083 306.855 421.663 258.242 481.676 258.146ZM620.725 303.589C659.667 303.525 695.662 324.244 715.1 357.966C727.654 379.934 732.361 405.618 728.038 430.5C727.238 429.924 725.7 429.123 724.708 428.547L609.293 361.873C603.4 358.542 596.163 358.542 590.27 361.873L455 439.915V382.656L566.668 318.16C583.097 308.648 601.735 303.621 620.725 303.589ZM335.23 362.833V499.865C335.23 506.718 338.753 512.802 344.645 516.325L479.691 594.144L429.829 622.965L318.321 558.661C266.442 528.622 248.701 462.3 278.675 410.453C291.389 388.485 311.372 371.64 335.23 362.833ZM593.953 396.779L705.653 461.083C757.693 491.09 775.338 557.348 745.299 609.291L745.491 609.483C732.746 631.452 712.699 648.297 688.969 656.943V519.88C688.969 513.027 685.446 506.75 679.554 503.419L544.316 425.376L593.953 396.779ZM511.907 444.014L568.846 476.935V542.617L511.907 575.538L454.968 542.617V476.935L511.907 444.014ZM601.415 495.766L651.084 524.395V653.196C651.084 713.177 602.407 761.822 542.522 761.822V761.63C517.191 761.63 492.469 752.791 473.03 736.523C473.831 736.139 475.592 735.146 476.553 734.57L591.968 668.12C597.86 664.789 601.575 658.512 601.383 651.659L601.415 495.766ZM569.006 580.085V637.344L457.306 701.649C405.267 731.463 338.945 713.818 308.906 662.035H309.098C296.353 640.259 291.805 614.383 296.129 589.5C296.929 590.077 298.498 590.877 299.459 591.454L414.874 658.128C420.766 661.458 428.004 661.458 433.896 658.128L569.006 580.085Z" fill="#ECFFF8"/>
    </g>
    </g>
    <defs>
    <filter id="filter0_d_602_7" x="90" y="98" width="844" height="844" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="10"/>
    <feGaussianBlur stdDeviation="5"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_602_7"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_602_7" result="shape"/>
    </filter>
    <filter id="filter1_b_602_7" x="89.1269" y="87.1269" width="845.746" height="845.746" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feGaussianBlur in="BackgroundImageFix" stdDeviation="5.43656"/>
    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_602_7"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_602_7" result="shape"/>
    </filter>
    <filter id="filter2_ii_602_7" x="100" y="78" width="824" height="858" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="-20"/>
    <feGaussianBlur stdDeviation="20"/>
    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_602_7"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="14"/>
    <feGaussianBlur stdDeviation="32"/>
    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.304167 0 0 0 0 0.71194 0 0 0 0 1 0 0 0 0.1 0"/>
    <feBlend mode="normal" in2="effect1_innerShadow_602_7" result="effect2_innerShadow_602_7"/>
    </filter>
    <filter id="filter3_dddii_602_7" x="124.05" y="124.516" width="787.9" height="794.967" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dx="-14" dy="12"/>
    <feGaussianBlur stdDeviation="5"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.0833333 0 0 0 0 0.166667 0 0 0 0.1 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_602_7"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dx="6" dy="12"/>
    <feGaussianBlur stdDeviation="54"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.14875 0 0 0 0 0.7 0 0 0 0 0.534625 0 0 0 0.3 0"/>
    <feBlend mode="normal" in2="effect1_dropShadow_602_7" result="effect2_dropShadow_602_7"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="6"/>
    <feGaussianBlur stdDeviation="20"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.316667 0 0 0 0 0.202667 0 0 0 0.2 0"/>
    <feBlend mode="normal" in2="effect2_dropShadow_602_7" result="effect3_dropShadow_602_7"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect3_dropShadow_602_7" result="shape"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dx="10" dy="-15"/>
    <feGaussianBlur stdDeviation="7"/>
    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.332622 0 0 0 0 0.670833 0 0 0 0 0.549588 0 0 0 0.28 0"/>
    <feBlend mode="normal" in2="shape" result="effect4_innerShadow_602_7"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dx="3" dy="4"/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
    <feBlend mode="normal" in2="effect4_innerShadow_602_7" result="effect5_innerShadow_602_7"/>
    </filter>
    <linearGradient id="paint0_linear_602_7" x1="-181.14" y1="98" x2="-181.14" y2="1484.28" gradientUnits="userSpaceOnUse">
    <stop stop-color="white"/>
    <stop offset="0.489516" stop-color="#EFEFEF"/>
    <stop offset="1" stop-color="#C0C0C0"/>
    </linearGradient>
    <linearGradient id="paint1_linear_602_7" x1="499" y1="36" x2="499" y2="950" gradientUnits="userSpaceOnUse">
    <stop stop-color="#88F2CC"/>
    <stop offset="1" stop-color="#5EB391"/>
    </linearGradient>
    <linearGradient id="paint2_linear_602_7" x1="-181.14" y1="98" x2="-181.14" y2="1484.28" gradientUnits="userSpaceOnUse">
    <stop stop-color="white"/>
    <stop offset="0.489516" stop-color="#EFEFEF"/>
    <stop offset="1" stop-color="#C0C0C0"/>
    </linearGradient>
    </defs>
    </svg></span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }]
        })
    }

    // send POST request to API - get response
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) => {
        messageElement.classList.add("error");
        messageElement.textContent = "I'm feeling a little glitchy. Let's try again.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatInput.value = "";

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        //display ... while waiting for query response
        const incomingChatLi = createChatLi("...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

sendChatBtn.addEventListener("click", handleChat);
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));

// Add event listener to chatInput for pressing enter
chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevents the default behavior of textarea (new line)
        handleChat();
    }
});