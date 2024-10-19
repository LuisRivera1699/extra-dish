import './index.css';

const Header = ({ className, children }) => {
    return (
        <div className={className}>
            {children}
        </div>
    )
}

export default Header;