import { ethers } from 'ethers';

export default function useChainHelpers() {

  function getChainName(chainId) {
    if (chainId === 1) {
      return "Ethereum";
    } else if (chainId === 10) {
      return "Optimism";
    } else if (chainId === 56) {
      return "BNB Smart Chain";
    } else if (chainId === 69) {
      return "Optimism Testnet";
    } else if (chainId === 77) {
      return "Gnosis Testnet";
    } else if (chainId === 100) {
      return "Gnosis Chain";
    } else if (chainId === 137) {
      return "Polygon";
    } else if (chainId === 250) {
      return "Fantom";
    } else if (chainId === 4002) {
      return "Fantom Testnet";
    } else if (chainId === 42161) {
      return "Arbitrum";
    } else if (chainId === 421611) {
      return "Arbitrum Testnet";
    } else if (chainId === 421613) {
      return "Arbitrum Goerli Testnet";
    } else if (chainId === 80001) {
      return "Polygon Testnet";
    } else if (chainId === 3) {
      return "Ropsten";
    } else if (chainId === 4) {
      return "Rinkeby";
    } else if (chainId === 1313161555) {
      return "Aurora Testnet";
    } else {
      return "Unsupported Network";
    }
  }

  function getFallbackProvider(networkId) {
    let urls;

      if (networkId === 137) {
        // Polygon PoS Chain
        urls = [
          "https://1rpc.io/matic",
          "https://polygon-rpc.com/"
        ];
      } else if (networkId === 80001) {
        // Mumbai testnet (Polygon testnet)
        urls = [
          "https://matic-mumbai.chainstacklabs.com"
        ]
      } else if (networkId === 10) {
        // Optimism
        urls = [
          "https://optimism-mainnet.public.blastapi.io",
          "https://rpc.ankr.com/optimism"
        ]; 
      } else if (networkId === 56) {
        // BSC mainnet
        urls = [
          "https://bscrpc.com"
        ];
      } else if (networkId === 77) {
        // Gnosis Chain testnet (Sokol)
        urls = [
          "https://sokol.poa.network"
        ];
      } else if (networkId === 100) {
        // Gnosis Chain
        urls = [
          "https://rpc.xdaichain.com",
          "https://rpc.gnosischain.com"
        ];
      } else if (networkId === 250) {
        // Fantom Mainnet
        urls = [
          "https://1rpc.io/ftm",
          "https://rpcapi.fantom.network",
          "https://rpc.ftm.tools"
        ];
      } else if (networkId === 4002) {
        // Fantom Testnet
        urls = [
          "https://rpc.ankr.com/fantom_testnet",
          //"https://rpc.testnet.fantom.network",
          "https://fantom-testnet.public.blastapi.io"
        ];
      } else if (networkId === 42161) {
        // Arbitrum
        urls = [
          "https://1rpc.io/arb",
          "https://arb1.arbitrum.io/rpc"
        ];
      } else if (networkId === 421611) {
        // Arbitrum testnet
        urls = [
          "https://rinkeby.arbitrum.io/rpc"
        ];
      } else if (networkId === 421613) {
        // Arbitrum Goerli testnet
        urls = [
          "https://goerli-rollup.arbitrum.io/rpc"
        ];
      } else if (networkId === 1313161555) {
        // Aurora testnet
        urls = [
          "https://testnet.aurora.dev"
        ];
      }

      if (urls) {
        const providers = urls.map(url => new ethers.providers.JsonRpcProvider(url));
        return new ethers.providers.FallbackProvider(providers, 1); // return fallback provider
      } else {
        return null;
      }
  }

  function switchNetwork(networkName) {
    let method;
    let params;

    if (networkName == "Ethereum") {
      method = "wallet_switchEthereumChain"
      params = [{ chainId: "0x1" }] 
    } else if (networkName == "Ropsten") {
      method = "wallet_switchEthereumChain"
      params = [{ chainId: "0x3" }] 
    } else if (networkName == "Rinkeby") {
      method = "wallet_switchEthereumChain"
      params = [{ chainId: "0x4" }] 
    } else if (networkName == "Polygon Testnet") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://mumbai.polygonscan.com" ],
        chainId: "0x13881",
        chainName: "Mumbai Testnet",
        nativeCurrency: { decimals: 18, name: "Matic", symbol: "MATIC" }, 
        rpcUrls: ["https://matic-mumbai.chainstacklabs.com"]
      }] 
    } else if (networkName == "Arbitrum Testnet") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://testnet.arbiscan.io" ],
        chainId: "0x66EEB",
        chainName: "Arbitrum Testnet",
        nativeCurrency: { decimals: 18, name: "ETH", symbol: "ETH" }, 
        rpcUrls: ["https://rinkeby.arbitrum.io/rpc"]
      }] 
    } else if (networkName == "Arbitrum Goerli Testnet") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://goerli.arbiscan.io" ],
        chainId: "0x66EED",
        chainName: "Arbitrum Goerli Testnet",
        nativeCurrency: { decimals: 18, name: "ETH", symbol: "ETH" }, 
        rpcUrls: ["https://goerli-rollup.arbitrum.io/rpc"]
      }] 
    } else if (networkName == "Arbitrum") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://arbiscan.io" ],
        chainId: "0xA4B1",
        chainName: "Arbitrum One",
        nativeCurrency: { decimals: 18, name: "ETH", symbol: "ETH" }, 
        rpcUrls: ["https://1rpc.io/arb",]
      }] 
    } else if (networkName == "Optimism") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://optimistic.etherscan.io/" ],
        chainId: "0xA",
        chainName: "Optimism",
        nativeCurrency: { decimals: 18, name: "ETH", symbol: "ETH" }, 
        rpcUrls: ["https://rpc.ankr.com/optimism"]
      }] 
    } else if (networkName == "Optimism Testnet") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://kovan-optimistic.etherscan.io/" ],
        chainId: "0x45",
        chainName: "Optimism Testnet",
        nativeCurrency: { decimals: 18, name: "ETH", symbol: "ETH" }, 
        rpcUrls: ["https://kovan.optimism.io"]
      }] 
    } else if (networkName == "Polygon") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://polygonscan.com" ],
        chainId: "0x89",
        chainName: "Polygon PoS Chain",
        nativeCurrency: { decimals: 18, name: "MATIC", symbol: "MATIC" }, 
        rpcUrls: ["https://1rpc.io/matic"]
      }] 
    } else if (networkName == "Gnosis Testnet") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://blockscout.com/poa/sokol" ],
        chainId: "0x4D",
        chainName: "Gnosis Testnet",
        nativeCurrency: { decimals: 18, name: "SPOA", symbol: "SPOA" }, 
        rpcUrls: ["https://sokol.poa.network"]
      }] 
    } else if (networkName == "Gnosis Chain") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://blockscout.com/xdai/mainnet" ],
        chainId: "0x64",
        chainName: "Gnosis Chain",
        nativeCurrency: { decimals: 18, name: "XDAI", symbol: "XDAI" }, 
        rpcUrls: ["https://rpc.gnosischain.com"]
      }] 
    } else if (networkName == "BNB Smart Chain") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://bscscan.com/" ],
        chainId: "0x38",
        chainName: "BNB Smart Chain",
        nativeCurrency: { decimals: 18, name: "BNB", symbol: "BNB" }, 
        rpcUrls: ["https://bscrpc.com"]
      }] 
    } else if (networkName == "Aurora Testnet") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://testnet.aurorascan.dev/" ],
        chainId: "0x4E454153",
        chainName: "Aurora Testnet",
        nativeCurrency: { decimals: 18, name: "ETH", symbol: "ETH" }, 
        rpcUrls: ["https://testnet.aurora.dev"]
      }] 
    } else if (networkName == "Fantom") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://ftmscan.com" ],
        chainId: "0xFA",
        chainName: "Fantom",
        nativeCurrency: { decimals: 18, name: "FTM", symbol: "FTM" }, 
        rpcUrls: ["https://1rpc.io/ftm"]
      }] 
    } else if (networkName == "Fantom Testnet") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://testnet.ftmscan.com" ],
        chainId: "0xFA2",
        chainName: "Fantom Testnet",
        nativeCurrency: { decimals: 18, name: "FTM", symbol: "FTM" }, 
        rpcUrls: ["https://rpc.ankr.com/fantom_testnet"]
      }] 
    }

    return { 
      method: method, 
      params: params
    }
  }

  // RETURN
  return {
    getChainName,
    getFallbackProvider,
    switchNetwork
  }
}