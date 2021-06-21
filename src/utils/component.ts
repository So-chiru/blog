/**
 * 주어진 인자들을 합쳐 값이 올바른지 확인하고 하나의 클래스 이름으로 제공합니다.
 * @param arr string 이나 false 형식의 인자
 * @returns 합쳐진 클래스 이름.
 */
export const concatClass = (...arr: (string | undefined | false)[]): string => {
  return arr.filter(v => v !== undefined && v !== false).join(' ')
}
