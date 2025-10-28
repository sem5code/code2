def xor(a, b):
    result = []
    for i in range(1, len(b)):
        result.append(str(int(a[i]) ^ int(b[i])))
    return ''.join(result)

def mod2div(dividend, divisor):
    pick = len(divisor)
    tmp = dividend[0:pick]

    while pick < len(dividend):
        if tmp[0] == '1':
            tmp = xor(divisor, tmp) + dividend[pick]
        else:
            tmp = xor('0' * pick, tmp) + dividend[pick]
        pick += 1

    if tmp[0] == '1':
        tmp = xor(divisor, tmp)
    else:
        tmp = xor('0' * pick, tmp)

    return tmp

def encodeData(data, key):
    appended_data = data + '0' * (len(key) - 1)
    remainder = mod2div(appended_data, key)
    return data + remainder

data = input("Enter the binary data to transmit: ")
key = input("Enter the binary key (divisor): ")

print("Original Data: ", data)
encoded = encodeData(data, key)
print("Transmitted Data with CRC: ", encoded)

'''Enter the binary data to transmit: 101100
Enter the binary key (divisor): 1001
Original Data: 101100
Transmitted Data with CRC: 101100001'''

print("\n")
def calculate_checksum(data):
    s = sum(data)
    while s >> 8:
        s = (s & 0xFF) + (s >> 8)
    checksum = ~s & 0xFF
    return checksum

def verify_checksum(data, checksum):
    total = sum(data) + checksum
    while total >> 8:
        total = (total & 0xFF) + (total >> 8)
    return (total == 0xFF)

input_str = input("Enter data bytes in hex (e.g. 12 34 56): ")
data = [int(byte, 16) for byte in input_str.split()]

checksum = calculate_checksum(data)

print("Data:", [hex(b) for b in data])
print("Calculated Checksum:", hex(checksum))

result = "Success" if verify_checksum(data, checksum) else "Error Detected"
print("Verification:", result)

'''Enter data bytes in hex (e.g. 12 34 56): 12 34 56
Data: ['0x12', '0x34', '0x56']
Calculated Checksum: 0x63
Verification: Success'''
