import "./styles.scss";

import cls from "classnames";
import { FC, useEffect } from "react";

import useNetworksStore from "../../store/useNetworksStore/useNetworksStore";
import Loading from "../Loading";

// список всех сетей

const ListNetwork: FC = () => {
  const {
    isLoadingNet,
    networks,
    getNetworks,
    activeNetwork,
    setActiveNetwork,
  } = useNetworksStore();

  useEffect(() => {
    getNetworks();
  }, []);

  if (isLoadingNet) {
    return <Loading />;
  }

  return (
    <div className="listNetwork">
      <div className="listNetwork_items">
        {networks.map((network) => (
          <div
            className={cls("listNetwork_items_item", {
              active: activeNetwork.id === network.id,
            })}
            key={network.id}
            onClick={() => {
              setActiveNetwork(network.id, network.name, true);
            }}
          >
            <p>{network.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListNetwork;
