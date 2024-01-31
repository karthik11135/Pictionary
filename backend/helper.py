
def allAreTrue(mp, artist):
    print(mp)
    # print(list(mp.values()))
    mp[list(mp.keys())[artist]] = True
    # print(mp)
    flag = 0
    for id, bin in mp.items():
        if bin == False:
            flag = 1
            break
    if flag == 0:
        return True
    return False