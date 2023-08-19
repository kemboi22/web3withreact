const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Welcome = () => {

    return (
        <div className={"flex -w-full justify-center items-center"}>
            <div className={"flex md:flex-row flex-col items-start justify-between md:p-20 py-12 p-4"}>
                <div className={"flex flex-1 justify-start flex-col md:mr-10"}>
                    <h1 className={"text-3xl sm:text-5xl text-gradient text-white py-1"}>Send Crypto<br/> across the
                        world
                    </h1>
                    <p className={"text-white text-left mt-5 font-light md:w-9/12 w-11/12 text-base"}>
                        Explore the crypto world. Buy and send crypto in Krypto
                    </p>
                    <button type={"button"}
                            className={"flex flex-row justify-center items-center my-5 text-white bg-blue-600 p-3 cursor-pointer rounded-full hover:bg-blue-800 text-base font-semibold   mt-4"}
                            onClick={connectToWallet}>
                        Connect to Wallet
                    </button>
                    <div className={"grid sm:grid-cols-3 grid-cols-2 w-full mt-10"}>
                        <div className={`rounded-tl-2xl ${commonStyles}`}>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const connectToWallet = () => {

}
export default Welcome