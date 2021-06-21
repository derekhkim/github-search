import styled from "@emotion/styled";

type CardProps = {
  link: string;
  image: string;
  title: string;
  description: string;
};

const Card: React.VFC<CardProps> = (props: CardProps) => {
  const { link, image, title, description } = props;
  return (
    <CardContainer>
      <a href={link}>
        <Image src={image} aria-label={title + "-image"} />
      </a>
      <CardBody>
        <Title aria-label={title}>{title}</Title>
        <Description aria-label={description}>{description}</Description>
      </CardBody>
    </CardContainer>
  );
};

const CardContainer = styled.div({
  flex: 1,
  flexBasis: "15%",
  margin: "15px",
  border: "solid 2px #3a3a3a",
  borderRadius: "5px",
});

const CardBody = styled.div({
  padding: "10px",
});

const Title = styled.h1({
  fontSize: "15px",
  textAlign: "center",
});

const Description = styled.p({
  fontSize: "12px",
  textAlign: "center",
});

const Image = styled.img({
  width: "100%",
});

export default Card;
