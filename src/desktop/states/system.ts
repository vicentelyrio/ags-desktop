export const cpuRaw = Variable(0, {
  poll: [2000, ['sh', '-c', "top -bn1 | grep 'Cpu(s)' | awk '{printf \"%.2f\", (100 - $8) / 100}'"], (out) => Number(out)]
})

export const cpuLabel = Variable('0%', {
  poll: [2000, ['sh', '-c', "top -bn1 | grep 'Cpu(s)' | awk '{printf \"%.2f\", 100 - $8}'"], (out) => `${out}%`]
})

export const ramRaw = Variable(0, {
  poll: [2000, ['sh', '-c', 'free | awk \'/Mem:/ {printf "%.2f", $3/$2}\''], (out) => Number(out)]
})

export const ramLabel = Variable('', {
  poll: [2000, ['sh', '-c', "free -h | grep Mem | awk '{print $3}'"], (out) => out]
})
