import { createContext, useReducer } from "react";
const dummyExpensesData = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e2',
        description: 'Lunch',
        amount: 9.99,
        date: new Date('2021-12-20')
    },
    {
        id: 'e3',
        description: 'Grocer',
        amount: 39.99,
        date: new Date('2021-12-21')
    },
    {
        id: 'e4',
        description: 'Kino book',
        amount: 19.99,
        date: new Date('2021-12-23')
    },
    {
        id: 'e5',
        description: 'Snacks',
        amount: 4.99,
        date: new Date('2021-12-28')
    }
]

export const ExpensesContext = createContext({
    expenses: [],
    addExpense:({ description, amount, date }) => {},
    deleteExpense:(id) => {},
    updateExpense: (id, { description, amount, date }) => {}
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString + Math.random().toString();
            return [{ ...action.payload, id: id }, ...state]

        case 'UPDATE':
            // find id of item to be updated
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            );
            // item to be updated
            const updatableExpense = state[updatableExpenseIndex];
            // create new item with existing item id
            const updatedItem = { ...updatableExpense, ...action.payload.data };
            // create new arrays to store updated item with the rest
            const updatedExpenses = [...state];
            // update arrays
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;

        case 'DELETE':
            return state.filter(
                (expense) => expense.id !== action.payload
            );

        default:
            return state;
    }
}

function ExpensesContextProvider({children}) {
    const [expensesState, dispatch] = useReducer(expensesReducer, dummyExpensesData);

    function addExpense(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData });
    }

    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id});
    }

    function updateExpense(id, expenseData) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData }});
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        updateExpense: updateExpense,
        deleteExpense: deleteExpense
    };

    return <ExpensesContext.Provider value={value}>
        {children}
    </ExpensesContext.Provider>
}

export default ExpensesContextProvider;