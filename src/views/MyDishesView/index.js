import './index.css';

const MyDishesView = () => {
    return (
        <DashboardContent>
            <DishCard
                imgSrc="https://origin.cronosmedia.glr.pe/large/2024/05/02/lg_6633bb8bed7fed5a801a8bb0.jpg"
            >
                <DishInfo
                    dishName="Tallarines verdes"
                    dishDescription="Ricos tallarines verdes con 2 huevos fritos."
                    status="Status"
                    address="Address"
                    price="Price"
                />
            </DishCard>
            
        </DashboardContent>
    )
}

export default MyDishesView;