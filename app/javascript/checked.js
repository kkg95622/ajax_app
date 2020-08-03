function check() {
  console.log("js")
  const posts = document.getElementsByClassName("post");

  postsA = Array.from(posts);
  console.log(postsA)

  postsA.forEach(function (post) {
    console.log(post)
      if (post.getAttribute("data-load") != null) {
        return null;
      }
      post.setAttribute("data-load", "true");
    post.addEventListener("click", (e) => {
      
      const postId = post.getAttribute("data-id");
      const XHR = new XMLHttpRequest();
      console.log(postId)

      XHR.open("GET", `/posts/${postId}`, true);
      XHR.responseType = "json";
      XHR.send();
      XHR.onload = () => {
        const item = XHR.response.post;
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }

        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`); 
        } else {
          return null;
        }
      };

      XHR.onerror = () => {
        alert("Request failed");
      };

      e.preventDefault();
    });
  });
}

setInterval(check, 1000);