import Transaction from '../models/Transaction';

interface CreateTransactionDTO{
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
    .filter((income) => income.type === 'income')
    .reduce((sum, transaction) => sum +  transaction.value, 0 );

    const outcome = this.transactions
    .filter((outcome) => outcome.type === 'outcome')
    .reduce((sum, transaction) => sum +  transaction.value, 0 );

   const total = income - outcome;

   const balance = {
     income,
     outcome,
     total,
   };

   return balance;

   }

  public create({title, value, type} : CreateTransactionDTO): Transaction {
    if(type === 'outcome'){
      const newbalance = this.getBalance().total - value;
      if(newbalance < 0){
        throw new Error('Cannot complet transaction, insuficent balance');
      }
    }
    const transaction = new Transaction({title, value, type});

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
