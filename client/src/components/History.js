import React from 'react'
import { useSelector } from 'react-redux'
import boarIllustration from '../pictures/red-boar.png'

function History() {

    const datas = useSelector(state => state.datas)

    const display = () => {
        if(datas.length === 0)
        {
            return (
                <div className="history__no-data">
                    <span className="no-data__span">dodaj dane, dziku</span>
                    <img className="no-data__image" src={boarIllustration} alt="boar-illustration"/>
                </div>
                )   
        }

        return (
            datas.map(data => Object.entries(data)).map((value, id) => {

                let datas = []
                let image
                let date

                for(let [, val] of Object.entries(value))
                {
                    if(val[0] === 'Date') date = val[1]
                    else if(val[0] === 'image') image = val[1]
                    else if(val[0] !== '_id')
                    {
                        datas.push(`${val[0]}: ${val[1]}cm`)
                    }
                }

                return(
                    <div className="history__tab" key={id}>
                        <h2 className="tab__header">{date}</h2>
                        <span className="tab__number">{id + 1}</span>
                        <div className="tab__section">
                            {image && <img className="tab__image" alt="zdjęcie sylwetki" src={document.location.origin + '/' + image} />}
                            <div className={image ? "tab__data" : "tab__data tab__data--just-data"}>
                                {datas.map((data, key) => <span key={key}>{data}</span>)}
                            </div>
                        </div>
                    </div>
                    
                )

            })
        )

    }

    return (
        <div className="history">
            <div className="history__tabs">
                {display()}
            </div>
        </div>
    )
}

export default History
