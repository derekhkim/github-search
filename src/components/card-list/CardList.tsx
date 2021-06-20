import Card from "../card";
import { getRepositories } from "../search-bar/duck";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";

const CardList: React.VFC = () => {
  const repos = useSelector(getRepositories);

  return (
    <CardListContainer>
      {repos &&
        repos.map((item) => (
          <Card
            key={item.id}
            link={item.html_url}
            title={item.name}
            description={item.description}
            image={item.owner.avatar_url}
          />
        ))}
    </CardListContainer>
  );
};

const CardListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default CardList;
