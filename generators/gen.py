import random as rand
from typing import Set, Tuple

_set = set()
max_int = int(2e9)

input = open('input', 'w')
output = open('output', 'w')

def init_tree(size: int):

    for i in range(size):
        d = rand.randint(0, max_int)
        if d in _set:
            size+=1
        else:
            _set.add(d)
    
    sorted(_set)
    input.write("I ")
    for i in _set: input.write(f'{i} ')
    input.write("\n")

def get_any_from_set(_set: Set) -> Tuple[int, int]:
    idx = rand.randint(0, len(list(_set))-1)
    d = list(_set)[idx]
    return d, idx

def get_any_from_not_set(_set: Set) -> int:
    result = -1
    while True:
        d = rand.randint(0, len(list(_set))-1)
        if d in _set: continue
        result = d
        break
    return result

def delete() -> int:
    d, _ = get_any_from_set(_set)
    _set.remove(d)
    input.write(f"D {d}\n")
    return d

def insert() -> int:
    d = get_any_from_not_set(_set)
    input.write(f"I {d}\n")
    return d

def update():
    d = delete()
    i = insert()
    input.write(f"U {d} {i}\n")

def search():
    # exist or non-exist
    d = rand.randint(0, 1)
    result = None
    if not d: 
        d = get_any_from_not_set(_set)
        input.write(f"S {d}\n")
        output.write("-1\n")
        return result
    d,_ = get_any_from_set(_set)
    result = d
    output.write(f'{d}\n')
    return result

def all_data():
    sorted(_set)
    for i in list(_set):
        output.write(f'{i}')
        output.write(' ')
    output.write("\n")
    return list(_set)

def call_random(funcs):
    d = rand.randint(0, 3)
    func = funcs[d]
    func()

funcs = [ update, delete, search, insert]

# Insert Update Delete Search (log n)
# operation
# update, delete, search, insert
n = int(5e6)
_try = int(1e5)

init_tree(n)

for i in range(_try):
    call_random(funcs)
    all_data()
    output.write("A\n")
