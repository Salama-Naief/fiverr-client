import { Text } from "@mantine/core";
import Image from "next/image";
import React from "react";
import { trustedCompanies } from "../../utils/data";

function TrustedComSection() {
  return (
    <section className="flex gap-x-12 items-center justify-center py-8 bg-gray-50">
      <Text fz={"xl"} fw={600} color={"gray.5"}>
        Trusted by:
      </Text>
      {trustedCompanies.map((com, index) => (
        <div key={index}>
          <Image src={com.src} width={com.width} height={1} alt="" />
        </div>
      ))}
    </section>
  );
}

export default TrustedComSection;
