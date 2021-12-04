export default function Home() {
  //   const { getAccessTokenSilently } = useAuth0();

  //   function fetchPosts() {
  //     getAccessTokenSilently().then((token) => {
  //       console.log(token);

  //       // send user token to API backend
  //       fetch("https://json-server-posts-api.herokuapp.com/api/posts", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //     });
  //   }

  return (
    <div>
      Home page
      <button type="button">Get posts</button>
    </div>
  );
}
