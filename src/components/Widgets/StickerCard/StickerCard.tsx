import React from "react";
import {
  Card,
  TopInfo,
  TitleWrapper,
  Title,
  SubTitle,
  IconBox,
  Price,
  Note,
  Text,
  Link,
} from "./StickerCard.style";
import Papa from "papaparse";
import { IosArrowUp } from "assets/icons/IosArrowUp";
import { IosArrowDown } from "assets/icons/IosArrowDown";

const StickerCard = ({
  title,
  subtitle,
  icon,
  price,
  indicator,
  indicatorText,
  note,
  link,
  linkText,
  data,
  fileName
}: any) => {
  const handleDownload = (data, filename) => {
    // Convert the array of objects to CSV data
    const csvData = Papa.unparse(data);

    // Create a Blob with the CSV data and get its URL
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Create an anchor element with the download attribute and click it to start the download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card>
      <TopInfo>
        <TitleWrapper>
          <Title>{title}</Title>
          <SubTitle>{subtitle}</SubTitle>
        </TitleWrapper>

        <IconBox>{icon}</IconBox>
      </TopInfo>

      <Price>{price}</Price>
      {indicator !== "" ? (
        indicator === "up" ? (
          <Text style={{ color: "#03D3B5" }}>
            <IosArrowUp width="9px" height="11px" /> {indicatorText}
            <Note> {note}</Note>
          </Text>
        ) : indicator === "down" ? (
          <Text style={{ color: "#FC6687" }}>
            <IosArrowDown width="9px" height="11px" /> {indicatorText}
            <Note> {note}</Note>
          </Text>
        ) : (
          ""
        )
      ) : (
        ""
      )}
      {link !== "" && (
        <div onClick={()=>handleDownload(data,fileName)}>
          <Link href={link} target="_blank">
          {linkText}
        </Link>
        </div>
      )}
    </Card>
  );
};

export default StickerCard;
