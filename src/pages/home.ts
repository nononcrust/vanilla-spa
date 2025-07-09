import { Link } from "../components/link";

export const HomePage = () => {
  return `
   <main>
     <h1>홈</h1>
     ${Link({ href: "/counter", children: "카운터 페이지로 이동" })}
   </main>
  `;
};
