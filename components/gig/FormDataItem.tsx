import { Text } from "@mantine/core";

export default function FromDataItem({ frist, second }) {
  return (
    <div className="my-3 px-6">
      <Text fw={600} color="gray.6">
        {frist}
      </Text>
      <Text fw={600} color="gray.8">
        {second}
      </Text>
    </div>
  );
}
