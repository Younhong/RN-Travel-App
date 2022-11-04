전반적으로 flutter와 유사하다.
View는 처음에 Container 역할로 알았으나 컨테이너, row, column, flexible 역할까지 한다.

* InkWell
```javascript
    <TouchableHighlight
        underlayColor="red"
        onPress={() => console.log('hi')}
    >
        <Text>Travel</Text>
    </TouchableHighlight>
```

* GestureDetector
```javascript
    <TouchableWithoutFeedback>
        <Text>Work</Text>
    </TouchableWithoutFeedback>
```

```javascript
    // 차이점은 글자 투명도도 같이 변경됨 다만 이 부분은 activeOpacity를 통해 조절 가능
    <TouchableOpacity activeOpacity={100}>
        <Text>Work</Text>
    </TouchableOpacity>
```