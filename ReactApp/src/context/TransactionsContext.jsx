import {createContext, useEffect, useState} from "react";
import {ethers} from "ethers";
import {contractABI, contractAddress} from "../Utils/Constants.js";

export const TransactionsContext = createContext();
const { ethereum }  = window

const getEthereumContract = async () => {
    const provider = new ethers.BrowserProvider(ethereum)
    const signer = await provider.getSigner()
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)
    return transactionContract
}

// eslint-disable-next-line react/prop-types
export const TransactionProvider = ({children}) => {
    const [formData, setFormData ] = useState({addressTo: "", amount: "", keyword: "", message: ""})
    const [currentAccount, setCurrentAccount] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"))
    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value}))
    }
    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Install Meta Mask")
            const accounts = await ethereum.request({method: "eth_accounts"})
            if (accounts.length)
            {
                setCurrentAccount(accounts[0])
                // Get All Transactions
            }else{
                console.log("No accounts ")
            }
        }catch (e) {
            throw new Error("No ethereum Object")
        }
    }
    const connectWallet = async () => {
        console.log("CLicked")
        try {
            if (!ethereum) return alert("Please install metamask")
            const accounts = await ethereum.request({method: "eth_requestAccounts"})
            setCurrentAccount(accounts[0])
        }catch (e)
        {
            console.error(e)
            throw new Error("Now ethereum object")
        }

    }
    useEffect( () => {
        checkIfWalletIsConnected()
    }, []);

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask")
            const {amount, addressTo, keyword, message} = formData;
            const transactionContract = await getEthereumContract()
            const parsedAmount = ethers.parseEther(amount)
            console.log(currentAccount)
            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: "0x5208",
                    value: "0x"+parsedAmount.toString(16),
                }]
            })
            const transactionHash = await transactionContract.addToBlockChain(addressTo, parsedAmount, message, keyword)
            setIsLoading(true)
            console.log("Loading "+ transactionHash.hash )
            await transactionHash.wait()
            setIsLoading(false)
            console.log("Success "+ transactionHash.hash )
            const transactionCount = await transactionContract.getTransactionCount()
            setTransactionCount(transactionCount)
        }catch (e) {
            console.log(e)
            throw new Error("No ethereum Object")
        }
    }

    return (
        <TransactionsContext.Provider value={{connectWallet, currentAccount, formData,  handleChange, sendTransaction}}>
        {children}
    </TransactionsContext.Provider>
    )
}