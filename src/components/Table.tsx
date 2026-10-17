import type { Konyvek } from "../type/Konyvek"
import { konyvekData } from "../data/konyvek"
import React, { useState } from "react"

function Table() {
    const [konyvekAdat, setKonyvekAdat] = useState<Konyvek[]>(konyvekData);
    const [searched, setSearched] = useState<Konyvek[]>([]);
    const [name,setName] = useState<string>("");
    const [key,setKey] = useState<keyof Konyvek>("cim" as keyof Konyvek);
    const [bool, setBool] = useState<boolean>(false)

    const [cim,setCim] = useState<string>("");
    const [szerzo, setSzerzo] = useState<string>("");
    const [kiEv, setKiEv] = useState<number>(0);
    const [mufaj, setMufaj] = useState<string>("");
    const [oldalszam,setOldalszam] = useState<number>(0);
    const [nyelv,setNyelv] = useState<string>("");
    const [rating, setRating] = useState<number>(3);
    const [elerheto, setElerheto] = useState<boolean>(false);
    
    function HandleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        try{
            e.preventDefault();
            if (cim == "")
            {
                throw new Error("A cím nem lehet üres!");
            }
            else if (szerzo == "") {
                throw new Error("A szerző nem lehet üres!");
            }
            else if (Number.isNaN(kiEv)) {
                throw new Error("Adj meg egy érvényes számot kiadási évnek!");
            }
            else if (mufaj == "") {
                throw new Error("A műfaj mező nem lehet üres!");
            }
            else if (Number.isNaN(oldalszam) || oldalszam <= 0) {
                throw new Error("Adj meg egy érvényes számot oldalszámnak!");
            }
            else if (nyelv == "") {
                throw new Error("A nyelv mező nem lehet üres!");
            }
            else if (Number.isNaN(rating) || rating < 1 || rating > 5) {
                throw new Error("Adj meg egy érvényes számot az értékelésnek!");
            }
            else if (elerheto != true && elerheto != false) {
                throw new Error("Elérhetőség értéke rossz!");
            }
            else {
                const ujKonyv = {
                    id: konyvekData.length+1,
                    cim: cim,
                    szerzo: szerzo,
                    kiadasi_ev: kiEv,
                    mufaj: mufaj,
                    oldalszam: oldalszam,
                    nyelv: nyelv,
                    ertekeles: rating,
                    elerheto: elerheto

                };
                setKonyvekAdat((meglevok) => [...meglevok,ujKonyv]);
                setCim("");
                setSzerzo("");
                setKiEv(0);
                setMufaj("");
                setOldalszam(0);
                setNyelv("");
                setRating(3);
                setElerheto(false);
                console.log(konyvekData)
            }
        }
        catch (err) {
            if (err instanceof Error) {
                alert(err.message);
            }
        }
    }

    function Sort(e: React.MouseEvent<HTMLElement>) {
        const thList = document.getElementsByTagName("th");
        for (var th of thList) {
            if (th.classList.contains("rendezett")) {
                th.classList.remove("rendezett");
                th.innerText = th.innerText
                    .replace(" &#8593;", "")
                    .replace(" &#8595;", "")
                    .replace(" ↑", "")
                    .replace(" ↓", "");
            }
        }

        const alap: Konyvek[] = bool? [...searched]:[...konyvekAdat];
        let rendezett: Konyvek[] = [];
        const key = e.currentTarget.getAttribute('data-key');
        e.currentTarget.classList.toggle("asc");
        e.currentTarget.classList.toggle("rendezett");
        if (e.currentTarget.classList.contains("asc")) {
            if(key == "kiadasi_ev" || key == "oldalszam" || key == "elerheto") {
                rendezett = alap.sort((a,b) => Number(a[key as keyof Konyvek])-Number(b[key as keyof Konyvek]));
            }
            else {
                rendezett = alap.sort((a,b) => String(a[key as keyof Konyvek]).localeCompare(String(b[key as keyof Konyvek])));
            }
            e.currentTarget.innerHTML += " &#8593;";
        }
        else {
            if(key == "kiadasi_ev" || key == "oldalszam" || key == "elerheto") {
                rendezett = alap.sort((a,b) => Number(b[key as keyof Konyvek])-Number(a[key as keyof Konyvek]));
            }
            else {
                rendezett = alap.sort((a,b) => String(b[key as keyof Konyvek]).localeCompare(String(a[key as keyof Konyvek])));
            }
            e.currentTarget.innerHTML += " &#8595;";
        }

        if (bool) {
            setSearched(rendezett);
        }
        else {
            setKonyvekAdat(rendezett);
        }

    }

    function Search() {
        setBool(true)
        if(name == "") {
            setSearched([]);
        }
        else {
            const lista: Konyvek[] = [];
            if (key as keyof Konyvek == "elerheto")
            {
                let boolName: boolean = false;
                if(name == "igen")
                {
                    boolName = true;
                }
                else {
                    boolName = false
                }
                konyvekAdat.forEach(konyv=> {
                    if(konyv.elerheto == boolName) {
                        lista.push(konyv)
                    }
                })
            }
            else {
                konyvekAdat.forEach(konyv => {
                    console.log(String(konyv[key as keyof Konyvek]).toLowerCase())
                    if (String(konyv[key as keyof Konyvek]).toLowerCase().includes(name.toLowerCase())) {
                        lista.push(konyv);
                    }
                })
            }
            setSearched([...lista]);
        }
    }

    function Delete() {
        setBool(false);
        setSearched([]);
    }


    return(
        <>
        <div className="searchInps">
            <div className="row">
                <div className="col-sm-6">
                    <label htmlFor="search" className="form-label">Keresett tartalom:</label>
                    <input type="text" onChange={(e) => {setName(e.target.value)}} name="search" className="form-control"/>
                    
                </div>
                <div className="col-sm-6">
                    <label htmlFor="key" className="form-label">Mező:</label>
                    <select name="key" onChange={(e) => {setKey(e.target.value  as keyof Konyvek)}} className="form-select">
                        <option value="cim">Cím</option>
                        <option value="szerzo">Szerző</option>
                        <option value="kiadasi_ev">Kiadási év</option>
                        <option value="mufaj">Múfaj</option>
                        <option value="oldalszam">Oldalszám</option>
                        <option value="nyelv">Nyelv</option>
                        <option value="ertekeles">Értékelés</option>
                        <option value="elerheto">Elérhető</option>
                    </select>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <button className="btn btn-primary" id="searchBtn" onClick={Search}>Keresés</button>
                        <button className="btn btn-danger" id="deleteBtn" onClick={Delete}>Keresés törlése</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-12">
                <table className="table table-bordered">
                    <thead>
                        <tr>                            
                            <th data-key="cim" onClick={(e) => Sort(e)}>Cím</th>
                            <th data-key="szerzo" onClick={(e) => Sort(e)}>Szerző</th>
                            <th data-key="kiadasi_ev" onClick={(e) => Sort(e)}>Kiadási év</th>
                            <th data-key="mufaj" onClick={(e) => Sort(e)}>Műfaj</th>
                            <th data-key="oldalszam" onClick={(e) => Sort(e)}>Oldalszám</th>
                            <th data-key="nyelv" onClick={(e) => Sort(e)}>Nyelv</th>
                            <th data-key="ertekeles" onClick={(e) => Sort(e)}>Értékelés</th>
                            <th data-key="elerheto" onClick={(e) => Sort(e)}>Elérhető?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !bool?
                            konyvekAdat.map((konyv,index) => (
                                <tr key={index}>
                                    <td>{konyv.cim}</td>
                                    <td>{konyv.szerzo}</td>
                                    <td>{konyv.kiadasi_ev}</td>
                                    <td>{konyv.mufaj}</td>
                                    <td>{konyv.oldalszam}</td>
                                    <td>{konyv.nyelv}</td>
                                    <td>{konyv.ertekeles}</td>
                                    <td>{konyv.elerheto? "Igen": "Nem"}</td>
                                </tr>
                            ))
                            :
                            searched.map((konyv, index) => (
                                <tr key={index}>
                                    <td>{konyv.cim}</td>
                                    <td>{konyv.szerzo}</td>
                                    <td>{konyv.kiadasi_ev}</td>
                                    <td>{konyv.mufaj}</td>
                                    <td>{konyv.oldalszam}</td>
                                    <td>{konyv.nyelv}</td>
                                    <td>{konyv.ertekeles}</td>
                                    <td>{konyv.elerheto? "Igen": "Nem"}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        <div className="form">
            <div className="row form">
                <div className="col-sm-12">
                    <h3>Könyv hozzáadása</h3>
                </div>
            </div>
            <form onSubmit={HandleSubmit}>
                <div className="row">
                    <div className="col-sm-4">
                        <label htmlFor="cim" className="form-label">Cím:</label>
                        <input type="text" value={cim} onChange={(e)=> {setCim(e.target.value)}} name="cim" className="form-control"/>
                    </div>
                    <div className="col-sm-4">
                        <label htmlFor="szerzo" className="form-label">Szerző:</label>
                        <input type="text" value={szerzo} onChange={(e) => {setSzerzo(e.target.value)}} name="szerző" className="form-control"/>
                    </div>
                    <div className="col-sm-4">
                        <label htmlFor="kiEv" className="form-label">Kiadási év:</label>
                        <input type="number" value={kiEv} onChange={(e) => {setKiEv(parseInt(e.target.value))}} name="kiEv" className="form-control" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <label htmlFor="mufaj" className="form-label">Műfaj:</label>
                        <input type="text" value={mufaj} onChange={(e) => {setMufaj(e.target.value)}} name="mufaj" className="form-control" />
                    </div>
                    <div className="col-sm-4">
                        <label htmlFor="oldalszam" className="form-label">Oldalszám:</label>
                        <input type="number" value={oldalszam} onChange={(e) => {setOldalszam(parseInt(e.target.value))}} name="oldalszam" className="form-control" />
                    </div>
                    <div className="col-sm-4">
                        <label htmlFor="nyelv" className="form-label">Nyelv:</label>
                        <input type="text" value={nyelv} onChange={(e) => {setNyelv(e.target.value)}} name="nyelv" className="form-control" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <label htmlFor="ertekeles" className="form-label">Értékelés: {rating}</label>
                        <input type="range" name="ertekeles" className="form-range" value={rating} onChange={(e) => (setRating(Number(e.target.value)))} min={1} max={5} step={0.1}/>
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="elerheto" className="form-check-label">Elérhető?</label>
                        <input type="checkbox" onChange={(e) => {
                            setElerheto(e.target.checked);
                            console.log(elerheto);
                        }} name="elerheto" className="form-check-input" />
                    </div>
                </div>
                <button type="submit" className="btn btn-success">Beküldés</button>
            </form>
        </div>
        </>
    )
}

export default Table