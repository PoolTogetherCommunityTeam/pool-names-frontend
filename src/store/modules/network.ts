import { useEthers } from 'vue-dapp';
import tokens from "../../abi/tokens.json";

const { chainId } = useEthers();

export default {
  namespaced: true,
  
  state: () => ({
    networkCurrency: "ETH",
    networkName: "Unsupported Network",
    supportedNetworks: {
      10: "Optimism"
    }
  }),

  getters: { 
    getBlockExplorerBaseUrl() {
      // TODO
      return "https://optimistic.etherscan.io";
    },
    
    getChainId() {
      return chainId.value;
    },

    getNetworkCurrency(state) {
      return state.networkCurrency;
    },

    getNetworkName(state) {
      const supportedIds = Object.keys(state.supportedNetworks);

      if (supportedIds && supportedIds.includes(String(chainId.value))) {
        return state.networkName;
      }

      return "Unsupported Network";
    },

    getSupportedNetworks(state) {
      return state.supportedNetworks;
    },

    getSupportedNetworkIds(state) {
      return Object.keys(state.supportedNetworks);
    },

    getSupportedNetworkNames(state) {
      return Object.values(state.supportedNetworks);
    },

    getTokens(state) {
      return tokens[String(chainId.value)]
    },

    isNetworkSupported(state) {
      const supportedIds = Object.keys(state.supportedNetworks);

      if (supportedIds && supportedIds.includes(String(chainId.value))) {
        return true;
      }

      return false;
    }
  },

  mutations: { 
    setNetworkData(state) {
      // TODO
      state.networkName = "Optimism";
      state.networkCurrency = "ETH";
    }
  },

  actions: { 
    
  }

};