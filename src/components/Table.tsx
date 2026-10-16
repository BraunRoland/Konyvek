import type { Konyvek } from "../type/Konyvek"
import { konyvekData } from "../data/konyvek"
import { useState } from "react"

 function Table() {
    const [searched, setSearched] = useState<Konyvek[]>([]);
    const [name,setName] = useState<string>("");
    const [key,setKey] = useState<keyof Konyvek | "">("");
    const [bool, setBool] = useState<boolean>(false)
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
                konyvekData.forEach(konyv=> {
                    if(konyv.elerheto == boolName) {
                        lista.push(konyv)
                    }
                })
            }
            else {
                konyvekData.forEach(konyv => {
                    console.log(String(konyv[key as keyof Konyvek]).toLowerCase())
                    if (String(konyv[key as keyof Konyvek]).toLowerCase().includes(name.toLowerCase())) {
                        lista.push(konyv);
                    }
                })
            }
            setSearched(lista);
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
                        <option value="cim" defaultChecked>Cím</option>
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
                            <th>Cím</th>
                            <th>Szerző</th>
                            <th>Kiadási év</th>
                            <th>Műfaj</th>
                            <th>Oldalszám</th>
                            <th>Nyelv</th>
                            <th>Értékelés</th>
                            <th>Elérhető?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !bool?
                            konyvekData.map(konyv => (
                                <tr>
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
                            searched.map(konyv => (
                                <tr>
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
        </>
    )
}

export default Table