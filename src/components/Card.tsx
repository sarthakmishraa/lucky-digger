interface Props {
    value: number
}

export const Card = (props: Props) => {
    const value = props.value;
    return(
        <div className="mines-card">
            {
                value === 1 ? (
                    <div className="mines-card-safe"></div>
                ):(
                    <div className="mines-card-bomb"></div>
                )
            }
        </div>
    )
};