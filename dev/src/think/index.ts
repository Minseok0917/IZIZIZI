/* 
    단일 책임의 원칙 : 하나의 동작
    개방-폐쇄의 원칙 : 확장은 가능하며 수정은 불가능
    리스코프 치환의 원칙 : 하위 클래스는 상위 클래스의 요소를 응용해야 한다.
    인터페이스 분리의 원칙 : 기능의 확장이 될 수 있으니 추상화 분리해라
    의존성 역전의 원칙 : 정책이 세부사항으로 인해 수정되면 안된다.
*/

export class Tooltip {
  public readonly name: string;
  public readonly description: string;
  public readonly shortcut: string;

  constructor(name: string, description: string, shortcut: string) {
    this.name = name;
    this.description = description;
    this.shortcut = shortcut;
  }
}
