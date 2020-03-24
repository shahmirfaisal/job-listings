const tags = document.querySelectorAll(".job__tag"),
  filterTags = document.querySelector(".filter__tags"),
  filter = document.querySelector(".filter"),
  clear = document.querySelector(".filter__clear"),
  jobs = document.querySelectorAll(".job");

tags.forEach(tag => {
  tag.addEventListener("click", addTags);
});
clear.addEventListener("click", removeFilter);

// Adding Tags to Filter
function addTags({ target: { innerHTML: tag } }) {
  let div = document.createElement("div");
  div.className = "filter__tag";
  div.innerHTML = `
                    <div class="filter__name">
                        ${tag}
                     </div>
                    <div class="filter__icon" onclick="removeFilterTag(this)">
                        <i class="fas fa-times"></i>
                     </div>
          `;
  filterTags.appendChild(div);

  //   Making sure that the filter element is visible
  filter.style.display = "flex";
  filterJobs();
}

// Removing Filter Tags
function removeFilterTag({ parentNode: parent }) {
  filterTags.removeChild(parent);
  filterJobs();
  if (filterTags.childNodes.length === 0) {
    removeFilter();
  }
}

// Removing Filter Element
function removeFilter() {
  filterTags.innerHTML = "";
  filter.style.display = "none";
  filterJobs();
}

// Filtering Jobs
function filterJobs() {
  let tags = filterTags.childNodes;
  console.log(tags);

  jobs.forEach(job => {
    let tags = job.lastElementChild.childNodes;
    let check = true;

    for (let tag of tags) {
      let tagName = tag.innerHTML;
      for (let filterTag of filterTags.childNodes) {
        let filterTagName = filterTag.firstElementChild.innerText;
        if (tagName === filterTagName) {
          check = true;
          break;
        } else {
          check = false;
        }
      }
      if (check) break;
    }

    job.style.display = check ? "flex" : "none";
  });
}
