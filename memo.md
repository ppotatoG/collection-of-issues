[Github REST API 사용하기](https://shanepark.tistory.com/146)

[github api 사용방법](https://taetaetae.github.io/2017/03/02/github-api/)

[포스트맨(Postman) 사용법과 API 실행해 보기](https://binit.tistory.com/17)

[Github API 다루기](https://velog.io/@kusdsuna/Github-API-%EB%8B%A4%EB%A3%A8%EA%B8%B0)

[[Develop/React] React, GraphQL, Apollo 맛보기](https://hoons-up.tistory.com/54)

[Importing a Component](https://create-react-app.dev/docs/importing-a-component/#absolute-imports)

1. repositories 검색
```
https://api.github.com/search/repositories?q={query}{&page,per_page,sort,order}

ex)
https://api.github.com/search/repositories?q=til
```

2. `1` 등록 (localstorage)
3. `2` 삭제
4. `2` 의 `issue` 모아보기
```
https://api.github.com/repos/michalsnik/aos/issues
```

## [router 연결하기](https://han-py.tistory.com/445)

## flow?

1. `search` : addRepo, localStorage.set
2. `issue` 
    - localStorage 기준으로 data 뿌려주기
    - localStorage 내용 삭제 가능

## fetchIssues

```js
const repos = JSON.parse(localStorage.getItem('viewIssue') || '{}');

// setIssues(null)
// repos 데이터 기준으로 axios.all
// setIssues((prevIssue : any | null) => [...prevIssue, ...res.data]);
```