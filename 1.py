class Solution:
    def reverseKGroup(self, head, k):
        dummy = Node(0)
        dummy.next = head
        prev_group_tail = dummy
        
        while True:
            kth = self.getKth(prev_group_tail, k)
            if not kth:
                break
            
            next_group_head = kth.next
            head_of_reversed = self.reverse(prev_group_tail.next, k)
            
            prev_group_tail.next = head_of_reversed
            prev_group_tail = self.getKth(dummy,k)
            prev_group_tail.next = next_group_head
            
            return dummy.next
                    
            def getKth(self, head, k);
            curr = head
            for _ in range(k):
                if not curr:
                    return None
                    curr = curr.next
                    return curr
                    
                    
                    def reverse(self, head, k):
                        new_head, tail = head, head
                        curr = head
                        for i in range(k - 1):
                            next = curr.next
                            curr.next = new_head
                            new_head = curr
                            curr = next
                            tail.next = curr
                            return new_head