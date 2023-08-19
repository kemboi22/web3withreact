import {createContext, useEffect, useState} from "react";
import {ethers} from "ethers";
import {contractABI, contractAddress} from "../Utils/Constants.js";

export const TransactionsContext = createContext();
const {ethereum} = window

const getEthereumContract = async () => {
    const provider = new ethers.BrowserProvider(ethereum)
    const signer = await provider.getSigner()
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)
    return transactionContract
}

// eslint-disable-next-line react/prop-types
export const TransactionProvider = ({children}) => {
    const [formData, setFormData] = useState({addressTo: "", amount: "", keyword: "", message: ""})
    const [currentAccount, setCurrentAccount] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"))
    const [transactions, setTransactions] = useState([])
    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value}))
    }
    const getAllTransactions = async () => {
        try {
            if (!ethereum) return alert("Please install Meta mask")
            const transactionContract = await getEthereumContract()
            const availableTransactions = await transactionContract.getAllTransactions()
            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(parseInt(transaction.timestamp) * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: convertToNumber(transaction.amount)

            }))
            setTransactions(structuredTransactions)
        } catch (e) {
            console.log(e)
            throw new Error("Ethereum Object not Found")
        }
    }
    const convertToNumber = (number) => {
        const weiValue = ethers.getNumber(number)
        return ethers.formatEther(weiValue)
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Install Meta Mask")
            const accounts = await ethereum.request({method: "eth_accounts"})
            if (accounts.length) {

                setCurrentAccount(accounts[0])
                await getAllTransactions()
                // Get All Transactions
            } else {
                console.log("No accounts ")
            }
        } catch (e) {
            throw new Error("No ethereum Object")
        }
    }
    const checkIfTransactionsExist = async () => {
        try {
            if (ethereum) {
                const transactionContract = await getEthereumContract();
                const transactionCount = await transactionContract.getTransactionCount();
                window.localStorage.setItem("transactionCount", transactionCount)
            }
        } catch (e) {
            console.log(e)
            throw new Error("No Ethereum Object")
        }

    }
    const connectWallet = async () => {
        console.log("CLicked")
        try {
            if (!ethereum) return alert("Please install metamask")
            const accounts = await ethereum.request({method: "eth_requestAccounts"})
            setCurrentAccount(accounts[0])
        } catch (e) {
            console.error(e)
            throw new Error("Now ethereum object")
        }

    }
    useEffect(() => {
        checkIfWalletIsConnected()
        checkIfTransactionsExist()
    }, [transactionCount]);

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask")
            const {amount, addressTo, keyword, message} = formData;
            const transactionContract = await getEthereumContract()
            const parsedAmount = ethers.parseEther(amount)
            setIsLoading(true)
            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: "0x5208",
                    value: "0x" + parsedAmount.toString(16),
                }]
            })
            const transactionHash = await transactionContract.addToBlockChain(addressTo, parsedAmount, message, keyword)
            console.log("Loading " + transactionHash.hash)
            await transactionHash.wait()
            setIsLoading(false)
            console.log("Success " + transactionHash.hash)
            const transactionCount = await transactionContract.getTransactionCount()
            setTransactionCount(transactionCount)
            window.location.reload()
        } catch (e) {
            console.log(e)
            throw new Error("No ethereum Object")
        }
    }

    return (
        <TransactionsContext.Provider
            value={{connectWallet, currentAccount, formData, handleChange, sendTransaction, isLoading, transactions}}>
            {children}
        </TransactionsContext.Provider>
    )
}