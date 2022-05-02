import { useEffect, useState, Fragment } from "react";
import Sidebar from "./Sidebar.js";
import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'

const Results = (props) => {
    const query = window.location.href.split('query/')[1];
    const [results, setResults] = useState([{"unkown": ""}]);
    const [view, setView] = useState("table")
    const [hideWins, setHideWins] = useState(false)
    const [hideLosses, setHideLosses] = useState(false)
    const [money, setMoney] = useState([]);
    const [num, setNum] = useState([]);
    const [loading, setLoading] = useState(true);
    const [animation, setAnimation] = useState(false);
    const [animationNumber, setAnimationNumber] = useState(0);
    const [finalWinnings, setFinalWinnings] = useState(0);

    let inter;

    const stepTowards = (finalWinnings) => {
        setAnimationNumber((prev) => {
            if ((prev >= finalWinnings && finalWinnings >= 0) ||
                (prev < finalWinnings && finalWinnings < 0)) {
                clearInterval(inter);
                setTimeout(() => {
                    setLoading(false);
                }, 2000)
                return prev
            } else {
                return (prev + (finalWinnings / 500));
        }

        })
    }

    let config = {
        labels: num,
        legend: false,
        datasets: [
          {
            label: "Total Winnings",
            data: money,
            fill: true,
            // backgroundColor: "rgb(74 222 128)",
            borderColor: "black",
            pointBackgroundColor: function(context) {
                var index = context.dataIndex;
                // var value = context.dataset.data[index];
                return results[index]["FavoredWins"] ? 'rgb(74 222 128)' : 'rgb(0,0,0)'
            }
          },
        ]
    }

    const keys = ["Game ID", "Date", "Home", "Away", "Bet", "Home Odds", "Away Odds", "Win", "Wager", "Winnings", "Total Winnings"]
    
    useEffect(() => {
        fetch("http://localhost:3000/" + query)
            .then(results => results.json())
            .then(data => {
                console.log(data);
                const money = [];
                const num = [];
                let i = 1;
                setFinalWinnings(data["winnings"]);
                setResults(data.results);
                for (const result of data.results) {
                    money.push(result["totalwinnings"]);
                    num.push(i);
                    i++;
                }
                setMoney(money);
                setNum(num);
                inter = setInterval(() => {stepTowards(data["winnings"]);}, 10);
            })
    }, [query])

    return (
    <div>
        {loading ? <div className="bg-black h-screen w-screen content-center">
            <h1 className={`text-green-400 text-6xl font-bold text-center h-screen justify-content-center p-96`}>
                ${animationNumber.toFixed(3)}
            </h1>
        </div> :
        <div className="flex flex-row h-screen overflow-y-scroll">
            <div className="basis-1/4 h-full">
                <Sidebar currentState={props.currentState}>
                </Sidebar>
            </div>
            <div className="basis-3/4 h-full overflow-y-scroll">
                <div className="h-1/4">
                    <p className="text-5xl text-center font-bold m-10">Results</p>
                    <div className="flex flex-row">
                        <div className="ml-4 w-1/2">
                            <button onClick={() => setView("table")} className={`border-black border-2 text-xl w-full rounded-l-lg ${view == "table" ? "bg-black text-green-400" : ""}`}>Table</button>
                        </div>
                        <div className="mr-4 w-1/2">
                            <button onClick={() => {setView("graph")} } className={`border-black border-2 text-xl w-full rounded-r-lg ${view == "graph" ? "bg-black text-green-400" : ""}`}>Graph</button>
                        </div>
                    </div>
                    <div className="flex flex-row mt-5">
                        <div className="ml-4 w-1/2">
                            <button onClick={() => setHideWins((prev) => {return !prev})} className={`border-black border-2 text-xl w-full rounded-l-lg ${hideWins ? "bg-black text-green-400" : ""}`}>Hide Wins</button>
                        </div>
                        <div className="mr-4 w-1/2">
                            <button onClick={() => setHideLosses((prev) => {return !prev})} className={`border-black border-2 text-xl w-full rounded-r-lg ${hideLosses ? "bg-black text-green-400" : ""}`}>Hide Losses</button>
                        </div>
                    </div>
                </div>
                <div className="basis-1/2 m-4">
                    {view === "table" ? <table className="overflow-x-scroll table-fixed">
                        <thead>
                            <tr>{keys.map(key => <th className="border-black border-2 p-2">{key}</th>)}</tr>
                        </thead>
                        <tbody>
                            {results.map((result, i) => 
                            <Fragment>{(result["FavoredWins"] === 1 && !hideWins || result["FavoredWins"] == 0 && !hideLosses) ? (
                            <tr className={`overflow-y-scroll border-black border-2 ${result["FavoredWins"] ? "bg-green-100" : "bg-white"}`}>
                                {Object.keys(result).map((key, i) => 
                                <td className="border-black border-2 p-2 text-center">
                                    {i === 9 || i === 10 ? <div>{result[key].toFixed(3)}</div> : <div>{i === 7 ? <div>{result[key] === 1 ? "Win" : "Lose"}</div> : <div>{result[key]}</div>}</div>}
                                </td>)}
                            </tr>) : <tr></tr>}</Fragment>)}
                        </tbody>
                    </table> : 
                    <div>
                        <Line 
                            data={config} />
                    </div>}
                </div>
            </div>
        </div>}
    </div>)
}

export default Results