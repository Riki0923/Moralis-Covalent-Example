const appId = "sQ3GxCFmtJ493YXHvDBaEfms2j9dYucCb0pcq9Ts";
const serverUrl = "https://kvodoqmgm9we.usemoralis.com:2053/server";

const contractAddress = "0x5517f03507950689f8221BB5D5f91b1D1c39b0cd";
const vaultAddress = "0x7b5ea207223950d63e7304dB03e58058C4A384E8";

const init = async () => {
    await Moralis.start({
        appId,serverUrl
    });

    Moralis.initPlugins();
    const covalent = Moralis.Plugins.covalent;


    // Ezt nagyon magyarázni nem kell, meghívja a contracton lévő NFT-ket egyesével
    const result = await covalent.getNftTokenIdForContract({
        chainId: 80001,
        contractAddress : vaultAddress,
        pageNumber: 10,
        pageSize: 100
    });
    //console.log("NFTs sorted one by one: ", result.data.items);


    // Ez itt meg tudja hívni egy adott ERC20 tokennek a balancát, például MATIC
    const balanceResult = await covalent.getTokenBalancesForAddress({
        chainId: 80001,
        address: vaultAddress,
        quoteCurrency: "MATIC"
    });

    //console.log("Balance of a chosen erc20 token ( like Matic): ",balanceResult);
    //console.log("MATIC Balance for Vault is: ", balanceResult.data.items[0].balance);

    //Az adott address tranzakcióit hívja meg 
    const transactionsForAnAddress = await covalent.getTransactionsForAddress({
        chainId: 80001,
        address: contractAddress,
        quoteCurrency: "MATIC",
        pageNumber: 10,
        pageSize: 100
    });

    console.log("Transactions for given Address is: ", transactionsForAnAddress);

    const erc20TokenTransactions = await covalent.getErc20TokenTransfersForAddress({
        chainId: 80001,
        address: "0x4dFFa442887E2353c41f1EA49260B7C623d5f344",
        tokenAddress:  contractAddress,
        quoteCurrency: "MATIC",
        pageNumber: 10,
        pageSize: 100
    });

    console.log("erc20TokenTransactions", erc20TokenTransactions);
};



init();