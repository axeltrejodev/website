function formatTime() {
  const date = new Date();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const isPM = hours >= 12;

  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }

  const period = isPM ? "PM" : "AM";

  return `${hours}:${minutes} ${period}.`;
}

export default formatTime;
