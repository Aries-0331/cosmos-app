import { links } from "@/config";
import Link from "next/link";
import { useRouter } from "next/router";

export function Nav() {
  const router = useRouter();
  return (
    <nav>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          justifyContent: "start",
          gap: "1rem",
        }}
      >
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.href}>
              <div
                style={{
                  cursor: "pointer",
                  color: router.pathname === link.href ? "black" : "gray",
                  textDecoration: "none",
                }}
              >
                {link.name}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
