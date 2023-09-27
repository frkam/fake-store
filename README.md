Installation
`pnpm install`

Development
`pnpm dev`

Deployment: https://fake-store-frkam.vercel.app/

### Tech Stack:
1. React + React Router
2. Zustand
3. Axios
4. Typescript
5. Tanstack Query
6. React Hook Form
7. Yup
8. Mantine

### FAQ

1. Why didn't i use loaders and other RR v6 abstractions?<br>
According to technical spec, i am required to use custom hooks that return the result from Tanstack Query. With this approach, I can't use loaders from RR with defer, because [it's impossible to use react hooks in loaders](https://github.com/remix-run/react-router/discussions/9246).