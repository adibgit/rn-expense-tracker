import ExpenseOutput from '../components/ExpenseOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { useContext } from 'react';


function AllExpenses() {
    const expenseCtx = useContext(ExpensesContext);
    return <ExpenseOutput 
        expensesPeriod="Total"
        expenses={expenseCtx.expenses} 
        fallbackText="No expenses registered ever"
    />
}

export default AllExpenses