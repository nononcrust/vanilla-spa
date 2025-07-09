import { router } from "../main";

export const Link = ({
  href,
  children,
}: {
  href: string;
  children: string;
}) => {
  return `<a href="${href}" class="link" data-spa-link>${children}</a>`;
};

const onLinkClick = (event: MouseEvent) => {
  const target = event.target;

  if (
    target instanceof HTMLElement &&
    target.tagName.toLowerCase() === "a" &&
    target.hasAttribute("data-spa-link")
  ) {
    event.preventDefault();

    const href = target.getAttribute("href");

    if (href) {
      router.push(href);
    }
  }
};

document.addEventListener("click", onLinkClick);
