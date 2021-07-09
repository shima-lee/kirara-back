let list = [{row:{rows:2}},{row:{rows:4}},{row:{rows:6}},{row:{rows:8}}]

let result = list.map(item => item.row)

expect = result.map(resultitem => {
    resultitem.user = resultitem.rows
})

console.log(expect)