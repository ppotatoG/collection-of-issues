[Github REST API 사용하기](https://shanepark.tistory.com/146)

[github api 사용방법](https://taetaetae.github.io/2017/03/02/github-api/)

[포스트맨(Postman) 사용법과 API 실행해 보기](https://binit.tistory.com/17)

[Github API 다루기](https://velog.io/@kusdsuna/Github-API-%EB%8B%A4%EB%A3%A8%EA%B8%B0)

[[Develop/React] React, GraphQL, Apollo 맛보기](https://hoons-up.tistory.com/54)

[Importing a Component](https://create-react-app.dev/docs/importing-a-component/#absolute-imports)

[REST API/Search](https://docs.github.com/en/rest/search#search-repositories)

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

## localStorage init

```js
const repos = JSON.parse(localStorage.getItem('viewIssue') || '{}');

// search 후 index 진입 시 repos 초기화
```

## axios.all

[https://blog.logrocket.com/using-axios-all-make-concurrent-requests/](https://blog.logrocket.com/using-axios-all-make-concurrent-requests/)

## useEffect

[[React] console.log가 두번 실행된다고?](https://velog.io/@hyes-y-tag/React-useEffect%EA%B0%80-%EB%91%90%EB%B2%88-%EC%8B%A4%ED%96%89%EB%90%9C%EB%8B%A4%EA%B3%A0)

## item.updated_at 시간 상이
- `updated_at`에 찍히는 시간과 실제 최근 업데이트 시간 상이

## 주요 기능
- `repositories` 검색
- `repositories` 검색 시 `정렬('default', 'stars', 'forks', 'updated')`
- 추가한 repositories에 대한 `issues` 모음