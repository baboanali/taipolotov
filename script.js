const nameInput = document.querySelector("#visitor-name");
const joinButton = document.querySelector("#join-button");
const message = document.querySelector("#message");

function setMessage(text, type) {
  message.classList.remove("is-error", "is-success", "show");
  void message.offsetWidth;
  message.textContent = text;
  if (type === "error") message.classList.add("is-error");
  if (type === "success") message.classList.add("is-success");
  message.classList.add("show");
}

function shakeInput() {
  nameInput.classList.remove("shake");
  void nameInput.offsetWidth;
  nameInput.classList.add("shake");
  nameInput.focus();
}

function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.className = "ripple";
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
  circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;

  const existing = button.querySelector(".ripple");
  if (existing) existing.remove();
  button.appendChild(circle);
}

function showMessage() {
  const name = nameInput.value.trim();

  if (name === "") {
    setMessage("Введите имя.", "error");
    shakeInput();
    return;
  }

  if (name.length < 2) {
    setMessage("Имя должно содержать минимум два символа.", "error");
    shakeInput();
    return;
  }

  setMessage(`${name}, рады видеть вас в клубе!`, "success");
}

joinButton.addEventListener("click", (event) => {
  createRipple(event);
  showMessage();
});

nameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    showMessage();
  }
});
