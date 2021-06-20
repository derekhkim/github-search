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
        <Image src={image} />
      </a>
      <CardBody>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </CardBody>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  flex: 1;
  flex-basis: 15%;
  margin: 15px;
  border: solid 2px #3a3a3a;
  border-radius: 5px;
`;

const CardBody = styled.div`
  padding: 10px;
`;

const Title = styled.h1`
  font-size: 15px;
  text-align: center;
`;

const Description = styled.p`
  font-size: 12px;
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
`;

export default Card;
