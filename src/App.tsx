import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import * as GQL from "./apollo/gqls/repos";

function App() {
  const { loading, data, refetch } = useQuery(GQL.GET_REPOS);

  console.log(loading)
  console.log(data)
  console.log(refetch)

  const [text, setText] = useState({
    userId: "",
    userName: "",
  });

  const handleUserIdChange = (e : any) => {
    setText({
      ...text,
      userId: e.target.value,
    });
  };

  const handleUserNameChange = (e : any) => {
    setText({
      ...text,
      userName: e.target.value,
    });
  };

  // const handleUserCreateClick = async (e) => {
  //   const data = await addUser({
  //     variables: { userId: text.userId, userName: text.userName },
  //   });
  //   console.log(data);
  //   refetch();
  // };

  return (
      <div>
        <h2>🚀 Apollo app 🚀</h2>
        {/*{loading ||*/}
        {/*    data.users.map((user : any, index : any) => {*/}
        {/*      return (*/}
        {/*          <h2 key={index}>*/}
        {/*            {user.userId} /{user.userName}*/}
        {/*          </h2>*/}
        {/*      );*/}
        {/*    })}*/}
        <input type="text" onChange={(e) => handleUserIdChange(e)} />
        <input type="text" onChange={(e) => handleUserNameChange(e)} />
        {/*<button onClick={handleUserCreateClick}>유저 등록</button>*/}
      </div>
  );
}

export default App;