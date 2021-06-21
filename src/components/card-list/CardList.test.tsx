import CardList from "./CardList";
import { Provider } from "react-redux";
import { RootState } from "../../common/types";
import configureMockStore from "redux-mock-store";
import { render } from "@testing-library/react";

const repositories = [
  {
    id: 0,
    html_url: "test-url-0",
    name: "test-name-0",
    description: "test-description-0",
    owner: {
      avatar_url: "test-avatar-0",
    },
  },
  {
    id: 1,
    html_url: "test-url-1",
    name: "test-name-1",
    description: "test-description-1",
    owner: {
      avatar_url: "test-avatar-1",
    },
  },
];

describe("CardList component", () => {
  it("renders cards correctly if store has repositories", () => {
    const state: RootState = {
      githubSearch: {
        repositories: repositories,
      },
    };

    const mockStore = configureMockStore<RootState>();
    const testStore = mockStore(state);

    const { getByTestId } = render(
      <Provider store={testStore}>
        <CardList />
      </Provider>
    );

    getByTestId(repositories[0].name + "-image");
    getByTestId(repositories[0].name);
    getByTestId(repositories[0].description);

    getByTestId(repositories[1].name + "-image");
    getByTestId(repositories[1].name);
    getByTestId(repositories[1].description);
  });

  it("renders no cards if store has no repositories", () => {
    const state: RootState = {
      githubSearch: {},
    };

    const mockStore = configureMockStore<RootState>();
    const testStore = mockStore(state);

    const { queryByTestId } = render(
      <Provider store={testStore}>
        <CardList />
      </Provider>
    );

    expect(queryByTestId(repositories[0].name + "-image")).toBeNull();
    expect(queryByTestId(repositories[0].name)).toBeNull();
    expect(queryByTestId(repositories[0].description)).toBeNull();

    expect(queryByTestId(repositories[1].name + "-image")).toBeNull();
    expect(queryByTestId(repositories[1].name)).toBeNull();
    expect(queryByTestId(repositories[1].description)).toBeNull();
  });
});
