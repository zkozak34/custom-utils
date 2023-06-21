class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;

    this.data = Array(rows)
      .fill([])
      .map((row) => (row = Array(this.cols).fill(0)));
  }

  randomize() {
    this.map((val, x, y) => Math.floor(Math.random() * 10));
  }

  add(n) {
    if (n instanceof Matrix) {
      if (this.rows !== n.rows || this.cols !== n.cols) {
        console.error("Columns count of A should be equal to Rows count of B.");
        return;
      }
      this.map((val, x, y) => val + n.data[x][y]);
    } else {
      this.map((val, x, y) => val + n);
    }
  }

  subtract(n) {
    if (n instanceof Matrix) {
      if (this.rows !== n.rows || this.cols !== n.cols) {
        console.error("Columns count of A should be equal to Rows count of B.");
        return;
      }
      this.map((val, x, y) => val - n.data[x][y]);
    } else {
      this.map((val, x, y) => val - n);
    }
  }

  multiply(n) {
    this.map((val, x, y) => val * n);
  }

  static multiply(a, b) {
    if (!(a instanceof Matrix || b instanceof Matrix)) {
      console.error("A and B should be instance of Matrix");
      return;
    }
    if (a.cols !== b.rows) {
      console.error("Columns count of A should be equal to Rows count of B.");
      return;
    }
    return new Matrix(a.rows, b.cols).map((val, x, y) => {
      let total = 0;
      for (let i = 0; i < a.cols; i++) {
        total += a.data[x][i] * b.data[i][y];
      }
      return total;
    });
  }

  transpose() {
    const result = new Matrix(this.cols, this.rows);
    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.cols; y++) {
        result.data[y][x] = this.data[x][y];
      }
    }
    return result;
  }

  map(func) {
    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.cols; y++) {
        let val = this.data[x][y];
        this.data[x][y] = func(val, x, y);
      }
    }
    return this;
  }

  static map(matrix, func) {
    return new Matrix(matrix.rows, matrix.cols).map((val, x, y) => func(matrix.data[x][y], x, y));
  }

  print() {
    console.table(this.data);
    return this.data;
  }

  copy() {
    const copyData = new Matrix(this.rows, this.cols);
    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.cols; y++) {
        copyData.data[x][y] = this.data[x][y];
      }
    }
    return copyData;
  }

  toArray() {
    const arr = [];
    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.cols; y++) {
        arr.push(this.data[x][y]);
      }
    }
    return arr;
  }

  static fromArray(arr) {
    if (typeof arr !== "object") {
      console.error("Type of arr parameter should be Array.");
      return;
    }
    if (typeof arr[0] === "number") {
      return new Matrix(arr.length, 1).map((val, x, y) => arr[x]);
    }
    if (typeof arr[0] === "object") {
      return new Matrix(arr.length, arr[0].length).map((val, x, y) => arr[x][y] || 0);
    }
  }

  toString() {
    return JSON.stringify(this);
  }
}
