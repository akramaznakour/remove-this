let changeStyleButton = document.getElementById("change-style-button");

changeStyleButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

const setPageBackgroundColor = () => {
  var animationCSS = `body {border: 5px solid red;} @keyframes shake {0% { transform: translate(1px, 1px) rotate(0deg); }10% { transform: translate(-1px, -2px) rotate(-1deg); }20% { transform: translate(-3px, 0px) rotate(1deg); }30% { transform: translate(3px, 2px) rotate(0deg); }40% { transform: translate(1px, -1px) rotate(1deg); }50% { transform: translate(-1px, 2px) rotate(-1deg); }60% { transform: translate(-3px, 1px) rotate(0deg); }70% { transform: translate(3px, 1px) rotate(-1deg); }80% { transform: translate(-1px, -1px) rotate(1deg); }90% { transform: translate(1px, 2px) rotate(0deg); }100% { transform: translate(1px, -2px) rotate(-1deg); }}; `;

  head = document.head || document.getElementsByTagName("head")[0];
  style = document.createElement("style");
  head.appendChild(style);
  style.type = "text/css";

  if (style.styleSheet) style.styleSheet.cssText = animationCSS;
  else style.appendChild(document.createTextNode(animationCSS));

  let body = document.querySelector("body");

  body.addEventListener(
    "click",
    (event) => {
      console.log("click");
      event.target.style.animation = "shake 0.5s infinite";
      setTimeout(() => {
        event.target.remove();
      }, 100);
    },
    false
  );

  body.addEventListener(
    "mouseover",
    function (event) {
      event.target.style.animation = "shake 0.5s infinite";
      setTimeout(() => {
        event.target.style.animation = "";
      }, 200);
    },
    false
  );
};
