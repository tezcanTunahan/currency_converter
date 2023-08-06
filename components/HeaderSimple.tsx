import { createStyles, Header, Container, Group } from "@mantine/core";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
  link: {
    lineHeight: 1,
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    "&:hover": {
      color: "blue",
    },
  },
}));

interface HeaderSimpleProps {
  links: { link: string; label: string }[];
}

export function HeaderSimple({ links }: HeaderSimpleProps) {
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={cx(classes.link)}
      onClick={(event) => {
        event.preventDefault();
        window.open(link.link, "_blank");
      }}
    >
      {link.label}
    </Link>
  ));

  return (
    <Header height={60}>
      <Container className={classes.header}>
        <Link href="/" className={classes.link}>
          CURRENCY CONVERTER
        </Link>
        <Group>{items}</Group>
      </Container>
    </Header>
  );
}
