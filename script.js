document.getElementById("add-subject").addEventListener("click", () => {
  const subjectName = prompt("Enter subject name:");
  if (subjectName) {
    const subjectDiv = document.createElement("div");
    subjectDiv.className = "subject";
    subjectDiv.innerHTML = `
      <h2>${subjectName}</h2>
      <button class="add-topic">➕ Add Topic</button>
      <ul class="topics"></ul>
    `;
    document.getElementById("subjects").appendChild(subjectDiv);

    subjectDiv.querySelector(".add-topic").addEventListener("click", () => {
      const topicName = prompt("Enter topic name:");
      const youtubeURL = prompt("Enter YouTube URL:");
      if (topicName && youtubeURL) {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${topicName}</strong><br>
          <iframe width="300" height="170" src="${youtubeURL.replace("watch?v=", "embed/")}" frameborder="0" allowfullscreen></iframe>`;
        subjectDiv.querySelector(".topics").appendChild(li);
      }
    });
  }
});
