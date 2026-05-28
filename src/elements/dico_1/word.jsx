export function Word({mot}) {
    if (! mot) return <></>;
    
    return (
        <table className="mot">
            <tbody>
            <tr>
                <th>
                    {mot.name}
                </th>
            </tr>
            <tr>
                <td>
                    {mot.sens}
                </td>
            </tr>
            {
                (mot.exemple) ?
                    <tr>
                        <td className="exemple">
                            {mot.exemple}
                        </td>
                    </tr> :
                    <tr className="noEx"><td></td></tr>
            }
            </tbody>
        </table>
    )
}