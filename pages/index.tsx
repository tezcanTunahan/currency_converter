import { Button, Group } from "@mantine/core";
import Converter from "../components/Converter";

export default function IndexPage() {
  return (
    <Group mt={50} position="center">
      <Converter />
    </Group>
  );
}
